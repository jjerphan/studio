import asyncio, os, sys, json, time

sys.path.append(os.path.abspath(os.getcwd()))
sys.path.append(os.path.join(os.getcwd(), "PYTHON"))
from fastapi import APIRouter, Request, Response
from captain.types.flowchart import (
    PostCancelFC,
    PostWFC,
)
from captain.utils.broadcast import (
    signal_standby,
)
from captain.utils.flowchart_utils import prepare_jobs_and_run_fc
from captain.utils.config import manager
from captain.utils.logger import logger

router = APIRouter(tags=["flowchart"])


"""
FRONT-END CLIENT ACCESSED END-POINTS
______________________________________

These end-points are accessed by the front-end client. They are used to
initiate processes on the back-end.
"""

# TODO do we want to convert field names from camelCase to snake_case?


@router.post("/cancel_fc", summary="cancel flowchart")
async def cancel_fc(req: PostCancelFC):
    logger.info("Cancelling flowchart...")
    if manager.running_topology is not None:
        manager.running_topology.cancel()
    if req.jobsetId is None:
        logger.debug("No jobsetId provided, skipping signal_standby")
        return
    asyncio.create_task(signal_standby(manager, req.jobsetId))


@router.post("/wfc", summary="write and run flowchart")
async def write_and_run_flowchart(request: PostWFC):
    # create message for front-end to indicate we are running pre-job operations
    if request.jobsetId is None:
        logger.debug("No jobsetId provided, skipping signal_prejob_op")
        return
    asyncio.create_task(prepare_jobs_and_run_fc(request=request, manager=manager))


"""
BACK-END CLIENT ACCESSED END-POINTS
_____________________________________

These end-points are accessed by the back-end client. They are used to implement
the event driven paradigm of the back-end. Workers that run jobs will poll these to 
signal a job has been finished.
"""


@router.post("/worker_response", summary="worker response")
async def worker_response(
    request: Request,
):  # TODO figure out way to use Pydantic model, for now use type Request otherwise does not work????
    logger.debug("Received a response from a worker")

    request_json = await request.json()
    request_dict = json.loads(request_json)

    if manager.running_topology is None:
        logger.debug("ERROR: no running topology")
        return Response(status_code=400)

    await manager.running_topology.process_worker_response(request_dict)

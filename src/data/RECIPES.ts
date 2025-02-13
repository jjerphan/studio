import { ElementsData } from "@/types";
import { ReactFlowJsonObject } from "reactflow";

export const NOISY_SINE: ReactFlowJsonObject<ElementsData> = {
  nodes: [
    {
      width: 208,
      height: 96,
      id: "CONSTANT-07f3a246-5fac-45ef-941f-91e41f8b7e11",
      type: "GENERATORS",
      data: {
        id: "CONSTANT-07f3a246-5fac-45ef-941f-91e41f8b7e11",
        label: "2.0",
        func: "CONSTANT",
        type: "GENERATORS",
        ctrls: {
          constant: {
            type: "float",
            default: 3,
            desc: null,
            functionName: "CONSTANT",
            param: "constant",
            value: "2.0",
          },
        },
        inputs: [
          {
            name: "default",
            id: "default",
            type: "Vector",
            multiple: false,
            desc: null,
          },
        ],
        outputs: [
          {
            name: "default",
            id: "default",
            type: "OrderedPair",
            desc: null,
          },
        ],
        path: "PYTHON/nodes/GENERATORS/SIMULATIONS/CONSTANT/CONSTANT.py",
        selected: false,
      },
      position: {
        x: -86.4795150311609,
        y: 278.0571792623407,
      },
      selected: false,
      positionAbsolute: {
        x: -86.4795150311609,
        y: 278.0571792623407,
      },
      dragging: true,
    },
    {
      width: 208,
      height: 96,
      id: "RAND-2840aa43-5d9a-4433-823f-6a23d606a97f",
      type: "GENERATORS",
      data: {
        id: "RAND-2840aa43-5d9a-4433-823f-6a23d606a97f",
        label: "RAND",
        func: "RAND",
        type: "GENERATORS",
        ctrls: {
          distribution: {
            type: "select",
            default: "normal",
            options: ["normal", "uniform", "poisson"],
            desc: "the distribution over the random samples",
            functionName: "RAND",
            param: "distribution",
            value: "normal",
          },
          lower_bound: {
            type: "float",
            default: 0,
            desc: "the lower bound of the output interval",
            functionName: "RAND",
            param: "lower_bound",
            value: 0,
          },
          upper_bound: {
            type: "float",
            default: 1,
            desc: "the upper bound of the output interval",
            functionName: "RAND",
            param: "upper_bound",
            value: 1,
          },
          normal_mean: {
            type: "float",
            default: 0,
            desc: 'the mean or "center" of the normal distribution',
            functionName: "RAND",
            param: "normal_mean",
            value: 0,
          },
          normal_standard_deviation: {
            type: "float",
            default: 1,
            desc: 'the spread or "width" of the normal distribution',
            functionName: "RAND",
            param: "normal_standard_deviation",
            value: 1,
          },
          poisson_events: {
            type: "float",
            default: 1,
            desc: "the expected number of events occurring in a fixed time-interval when distribution is poisson",
            functionName: "RAND",
            param: "poisson_events",
            value: 1,
          },
        },
        inputs: [
          {
            name: "default",
            id: "default",
            type: "OrderedPair|Vector",
            multiple: false,
            desc: "Optional input to use as the x-axis for the random samples",
          },
        ],
        outputs: [
          {
            name: "default",
            id: "default",
            type: "OrderedPair|Scalar",
            desc: "OrderedPair if there's an input\nx: the x-axis of the input\ny: the random samples\n\nScalar if there is no input\nc: the random number",
          },
        ],
        path: "PYTHON/nodes/GENERATORS/SIMULATIONS/RAND/RAND.py",
        selected: false,
      },
      position: {
        x: -78.09665974817639,
        y: 71.94658127967676,
      },
      selected: false,
      positionAbsolute: {
        x: -78.09665974817639,
        y: 71.94658127967676,
      },
      dragging: true,
    },
    {
      width: 208,
      height: 96,
      id: "SINE-b3fe92c7-36bf-4869-b25b-51c86b125e08",
      type: "GENERATORS",
      data: {
        id: "SINE-b3fe92c7-36bf-4869-b25b-51c86b125e08",
        label: "SINE",
        func: "SINE",
        type: "GENERATORS",
        ctrls: {
          amplitude: {
            type: "float",
            default: 1,
            desc: null,
            functionName: "SINE",
            param: "amplitude",
            value: 1,
          },
          frequency: {
            type: "float",
            default: 1,
            desc: null,
            functionName: "SINE",
            param: "frequency",
            value: 1,
          },
          offset: {
            type: "float",
            default: 0,
            desc: null,
            functionName: "SINE",
            param: "offset",
            value: 0,
          },
          phase: {
            type: "float",
            default: 0,
            desc: null,
            functionName: "SINE",
            param: "phase",
            value: 0,
          },
          waveform: {
            type: "select",
            default: "sine",
            options: ["sine", "square", "triangle", "sawtooth"],
            desc: null,
            functionName: "SINE",
            param: "waveform",
            value: "sine",
          },
        },
        inputs: [
          {
            name: "default",
            id: "default",
            type: "OrderedPair|Vector",
            multiple: false,
            desc: null,
          },
        ],
        outputs: [
          {
            name: "default",
            id: "default",
            type: "OrderedPair",
            desc: null,
          },
        ],
        path: "PYTHON/nodes/GENERATORS/SIMULATIONS/SINE/SINE.py",
        selected: false,
      },
      position: {
        x: -85.28899712362653,
        y: -137.62422088989467,
      },
      selected: false,
      positionAbsolute: {
        x: -85.28899712362653,
        y: -137.62422088989467,
      },
      dragging: true,
    },
    {
      width: 72,
      height: 72,
      id: "ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6",
      type: "ARITHMETIC",
      data: {
        id: "ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6",
        label: "ADD",
        func: "ADD",
        type: "ARITHMETIC",
        ctrls: {},
        inputs: [
          {
            name: "a",
            id: "a",
            type: "OrderedPair|Scalar|Vector",
            multiple: false,
            desc: null,
          },
          {
            name: "b",
            id: "b",
            type: "OrderedPair|Scalar|Vector",
            multiple: true,
            desc: null,
          },
        ],
        outputs: [
          {
            name: "default",
            id: "default",
            type: "OrderedPair|Scalar|Vector",
            desc: null,
          },
        ],
        path: "PYTHON/nodes/TRANSFORMERS/ARITHMETIC/ADD/ADD.py",
        selected: false,
      },
      position: {
        x: 277.7769837518414,
        y: 72.74309296103615,
      },
      selected: false,
      positionAbsolute: {
        x: 277.7769837518414,
        y: 72.74309296103615,
      },
      dragging: true,
    },
    {
      width: 225,
      height: 226,
      id: "HISTOGRAM-f9483fdf-a2c0-4de2-bda5-8900acba4124",
      type: "VISUALIZERS",
      data: {
        id: "HISTOGRAM-f9483fdf-a2c0-4de2-bda5-8900acba4124",
        label: "HISTOGRAM",
        func: "HISTOGRAM",
        type: "VISUALIZERS",
        ctrls: {},
        inputs: [
          {
            name: "default",
            id: "default",
            type: "OrderedPair|DataFrame|Matrix",
            multiple: false,
            desc: null,
          },
        ],
        outputs: [
          {
            name: "default",
            id: "default",
            type: "Plotly",
            desc: null,
          },
        ],
        path: "PYTHON/nodes/VISUALIZERS/PLOTLY/HISTOGRAM/HISTOGRAM.py",
        selected: false,
      },
      position: {
        x: 450.22511735469914,
        y: 166.9790174482946,
      },
      selected: false,
      positionAbsolute: {
        x: 450.22511735469914,
        y: 166.9790174482946,
      },
      dragging: true,
    },
    {
      width: 225,
      height: 226,
      id: "SCATTER-55268351-79af-4a28-a22c-d85b261b9681",
      type: "VISUALIZERS",
      data: {
        id: "SCATTER-55268351-79af-4a28-a22c-d85b261b9681",
        label: "SCATTER",
        func: "SCATTER",
        type: "VISUALIZERS",
        ctrls: {},
        inputs: [
          {
            name: "default",
            id: "default",
            type: "OrderedPair|DataFrame|Matrix",
            multiple: false,
            desc: null,
          },
        ],
        outputs: [
          {
            name: "default",
            id: "default",
            type: "Plotly",
            desc: null,
          },
        ],
        path: "PYTHON/nodes/VISUALIZERS/PLOTLY/SCATTER/SCATTER.py",
        selected: false,
      },
      position: {
        x: 453.2609421482763,
        y: -224.53664602472713,
      },
      selected: false,
      positionAbsolute: {
        x: 453.2609421482763,
        y: -224.53664602472713,
      },
      dragging: true,
    },
    {
      width: 208,
      height: 96,
      id: "LINSPACE-44bc0f90-7cef-4528-994e-338d20ef6e1c",
      type: "GENERATORS",
      data: {
        id: "LINSPACE-44bc0f90-7cef-4528-994e-338d20ef6e1c",
        label: "LINSPACE",
        func: "LINSPACE",
        type: "GENERATORS",
        ctrls: {
          start: {
            type: "float",
            default: 10,
            desc: "The start point of the data.",
            functionName: "LINSPACE",
            param: "start",
            value: 10,
          },
          end: {
            type: "float",
            default: 0,
            desc: "The end point of the data.",
            functionName: "LINSPACE",
            param: "end",
            value: 0,
          },
          step: {
            type: "int",
            default: 1000,
            desc: "The number of points in the vector.",
            functionName: "LINSPACE",
            param: "step",
            value: 1000,
          },
        },
        initCtrls: {},
        inputs: [
          {
            name: "default",
            id: "default",
            type: "Vector|OrderedPair",
            multiple: false,
            desc: "Optional input in case LINSPACE is used in a loop. Not used.",
          },
        ],
        outputs: [
          {
            name: "default",
            id: "default",
            type: "Vector",
            desc: "v: the vector between start and end with step number of points.",
          },
        ],
        path: "PYTHON/nodes/GENERATORS/SIMULATIONS/LINSPACE/LINSPACE.py",
        selected: false,
      },
      position: {
        x: -391.47325873080206,
        y: 67.82944032389025,
      },
      selected: false,
      positionAbsolute: {
        x: -391.47325873080206,
        y: 67.82944032389025,
      },
      dragging: true,
    },
  ],
  edges: [
    {
      source: "RAND-2840aa43-5d9a-4433-823f-6a23d606a97f",
      sourceHandle: "default",
      target: "ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6",
      targetHandle: "b",
      id: "reactflow__edge-RAND-2840aa43-5d9a-4433-823f-6a23d606a97fdefault-ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6b",
    },
    {
      source: "CONSTANT-07f3a246-5fac-45ef-941f-91e41f8b7e11",
      sourceHandle: "default",
      target: "ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6",
      targetHandle: "b",
      id: "reactflow__edge-CONSTANT-07f3a246-5fac-45ef-941f-91e41f8b7e11default-ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6b",
    },
    {
      source: "ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6",
      sourceHandle: "default",
      target: "HISTOGRAM-f9483fdf-a2c0-4de2-bda5-8900acba4124",
      targetHandle: "default",
      id: "reactflow__edge-ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6default-HISTOGRAM-f9483fdf-a2c0-4de2-bda5-8900acba4124default",
    },
    {
      source: "SINE-b3fe92c7-36bf-4869-b25b-51c86b125e08",
      sourceHandle: "default",
      target: "ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6",
      targetHandle: "a",
      id: "reactflow__edge-SINE-b3fe92c7-36bf-4869-b25b-51c86b125e08default-ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6a",
    },
    {
      source: "ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6",
      sourceHandle: "default",
      target: "SCATTER-55268351-79af-4a28-a22c-d85b261b9681",
      targetHandle: "default",
      id: "reactflow__edge-ADD-a3c1e32a-5032-4bed-8814-29f803ace0b6default-SCATTER-55268351-79af-4a28-a22c-d85b261b9681default",
    },
    {
      source: "LINSPACE-44bc0f90-7cef-4528-994e-338d20ef6e1c",
      sourceHandle: "default",
      target: "SINE-b3fe92c7-36bf-4869-b25b-51c86b125e08",
      targetHandle: "default",
      id: "reactflow__edge-LINSPACE-44bc0f90-7cef-4528-994e-338d20ef6e1cdefault-SINE-b3fe92c7-36bf-4869-b25b-51c86b125e08default",
    },
    {
      source: "LINSPACE-44bc0f90-7cef-4528-994e-338d20ef6e1c",
      sourceHandle: "default",
      target: "RAND-2840aa43-5d9a-4433-823f-6a23d606a97f",
      targetHandle: "default",
      id: "reactflow__edge-LINSPACE-44bc0f90-7cef-4528-994e-338d20ef6e1cdefault-RAND-2840aa43-5d9a-4433-823f-6a23d606a97fdefault",
    },
    {
      source: "LINSPACE-44bc0f90-7cef-4528-994e-338d20ef6e1c",
      sourceHandle: "default",
      target: "CONSTANT-07f3a246-5fac-45ef-941f-91e41f8b7e11",
      targetHandle: "default",
      id: "reactflow__edge-LINSPACE-44bc0f90-7cef-4528-994e-338d20ef6e1cdefault-CONSTANT-07f3a246-5fac-45ef-941f-91e41f8b7e11default",
    },
  ],
  viewport: {
    x: 650.2773141367447,
    y: 316.97786726909555,
    zoom: 1.241043234520508,
  },
};

export const EMPTY_CANVAS = {
  elements: [],
  position: [0, 0],
  zoom: 0.8,
};

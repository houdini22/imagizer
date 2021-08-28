import BaseTransformEffect from "../BaseTransform";
import { triangle, mod } from "../../../helpers/common";
import noise from "../../../helpers/noise";

interface Parameters {
  xAmplitude: number;
  yAmplitute: number;
  xWaveLength: number;
  yWaveLength: number;
  waveType: string;
}

class RippleEffect extends BaseTransformEffect {
  static getName(): string {
    return "ripple";
  }

  getDefaultParameters(): Parameters {
    return {
      xAmplitude: 5,
      yAmplitute: 0,
      xWaveLength: 16,
      yWaveLength: 16,
      waveType: "SINE", // SAWTOOTH TRIANGLE NOISE
    };
  }

  callback(
    x: number,
    y: number,
    parameters: Parameters,
    width: number,
    height: number
  ): Array<number> {
    let nx = y / parameters.xWaveLength,
      ny = x / parameters.yWaveLength,
      fx,
      fy;

    switch (parameters.waveType) {
      case "SINE":
      default:
        fx = Math.sin(nx);
        fy = Math.sin(ny);
        break;

      case "SAWTOOTH":
        fx = mod(nx, 1);
        fy = mod(ny, 1);
        break;

      case "TRIANGLE":
        fx = triangle(nx);
        fy = triangle(ny);
        break;

      case "NOISE":
        fx = noise.noise1(nx);
        fy = noise.noise1(ny);
        break;
    }

    return [x + parameters.xAmplitude * fx, y + parameters.yAmplitute * fy];
  }
}

export default RippleEffect;

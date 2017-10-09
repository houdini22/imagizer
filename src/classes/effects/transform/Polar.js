import BaseTransformEffect from '../BaseTransform'

class PolarEffect extends BaseTransformEffect {
  static getName () {
    return 'polar'
  }

  getDefaultParameters () {
    return {
      type: 'RECT_TO_POLAR' // RECT_TO_POLAR, POLAR_TO_RECT, INVERT_IN_CIRCLE
    }
  }

  before (parameters, width, height, imageData) {
    return {
      centreX: width / 2,
      centreY: height / 2,
      radius: Math.max(width / 2, height / 2),
      sqr: function (x) {
        return x * x
      }
    }
  }

  callback (x, y, parameters, width, height) {
    let theta, theta2, t,
      m, xMax, yMax, nx, ny, xmax, ymax,
      dx, dy, distance,
      r = 0

    switch (parameters.type) {
      case 'RECT_TO_POLAR':
        if (x >= this.data.centreX) {
          if (y > this.data.centreY) {
            theta = Math.PI - Math.atan(((x - this.data.centreX)) / ((y - this.data.centreY)))
            r = Math.sqrt(this.data.sqr(x - this.data.centreX) + this.data.sqr(y - this.data.centreY))
          }
          else {
            if (y < this.data.centreY) {
              theta = Math.atan(((x - this.data.centreX)) / ((this.data.centreY - y)))
              r = Math.sqrt(this.data.sqr(x - this.data.centreX) + this.data.sqr(this.data.centreY - y))
            }
            else {
              theta = Math.PI / 2
              r = x - this.data.centreX
            }
          }
        }
        else {
          if (x < this.data.centreX) {
            if (y < this.data.centreY) {
              theta = (Math.PI * 2) - Math.atan(((this.data.centreX - x)) / ((this.data.centreY - y)))
              r = Math.sqrt(this.data.sqr(this.data.centreX - x) + this.data.sqr(this.data.centreY - y))
            }
            else {
              if (y > this.data.centreY) {
                theta = Math.PI + Math.atan(((this.data.centreX - x)) / ((y - this.data.centreY)))
                r = Math.sqrt(this.data.sqr(this.data.centreX - x) + this.data.sqr(y - this.data.centreY))
              }
              else {
                theta = 1.5 * Math.PI
                r = this.data.centreX - x
              }
            }
          }
        }
        if (x != this.data.centreX) {
          m = Math.abs(((y - this.data.centreY)) / ((x - this.data.centreX)))
        }
        else {
          m = 0
        }

        if (m <= ((height / width))) {
          if (x == this.data.centreX) {
            xMax = 0
            yMax = this.data.centreY
          }
          else {
            xMax = this.data.centreX
            yMax = m * xMax
          }
        }
        else {
          yMax = this.data.centreY
          xMax = yMax / m
        }

        return [
          (width - 1) - (width - 1) / (Math.PI * 2 * theta),
          height * r / this.data.radius
        ]

      case 'POLAR_TO_RECT':

        theta = x / width * Math.PI * 2

        if (theta >= 1.5 * Math.PI) {
          theta2 = Math.PI * 2 - theta
        }
        else {
          if (theta >= Math.PI) {
            theta2 = theta - Math.PI
          }
          else {
            if (theta >= 0.5 * Math.PI
            ) {
              theta2 = Math.PI - theta
            }
            else {
              theta2 = theta
            }
          }
        }

        t = Math.tan(theta2)
        if (t != 0) {
          m = 1.0 / t
        }
        else {
          m = 0
        }

        if (m <= ((height) / (width))) {
          if (theta2 == 0) {
            xmax = 0
            ymax = this.data.centreY
          }
          else {
            xmax = this.data.centreX
            ymax = m * xmax
          }
        }
        else {
          ymax = this.data.centreY
          xmax = ymax / m
        }

        r = this.data.radius * (y / (height))

        nx = -r * Math.sin(theta2)
        ny = r * Math.cos(theta2)

        if (theta >= 1.5 * Math.PI) {
          return [
            this.data.centreX - nx,
            this.data.centreY - ny
          ]
        }
        else {
          if (theta >= Math.PI) {
            return [
              this.data.centreX - nx,
              this.data.centreY + ny
            ]
          }
          else {
            if (theta >= 0.5 * Math.PI) {
              return [
                this.data.centreX + nx,
                this.data.centreY + ny
              ]
            }
            else {
              return [
                this.data.centreX + nx,
                this.data.centreY - ny
              ]
            }
          }
        }
        break // TODO: ???

      case 'INVERT_IN_CIRCLE':
        dx = x - this.data.centreX
        dy = y - this.data.centreY
        distance = dx * dx + dy * dy

        return [
          this.data.centreX + this.data.centreX * this.data.centreX * dx / distance,
          this.data.centreY + this.data.centreY * this.data.centreY * dy / distance
        ]
    }
  }
}

export default PolarEffect
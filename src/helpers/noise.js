let parameters = {},
    isInit = false;

let noise = {
    init: function () {
        if (isInit) {
            return false;
        }
        isInit = true;

        parameters.B = 0x100;
        parameters.BM = 0xff;
        parameters.N = 0x1000;

        parameters.P = new Array(parameters.B + parameters.B + 2);
        parameters.G1 = new Array(parameters.B + parameters.B + 2);
        parameters.G2 = new Array(parameters.B + parameters.B + 2);
        for (i = 0; i < parameters.G2.length; i += 1) {
            parameters.G2[i] = new Array(2);
        }
        parameters.G3 = new Array(parameters.B + parameters.B + 2);
        for (i = 0; i < parameters.G3.length; i += 1) {
            parameters.G3[i] = new Array(3);
        }
        var i, j, k;

        for (i = 0; i < parameters.B; i += 1) {
            parameters.P[i] = i;
            parameters.G1[i] = ((this.random() % (parameters.B + parameters.B)) - parameters.B) / parameters.B;
            parameters.G2[i] = [];
            for (j = 0; j < 2; j += 1) {
                parameters.G2[i][j] = ((this.random() % (parameters.B + parameters.B)) - parameters.B) / parameters.B;
            }
            parameters.G2[i] = this.normalize2(parameters.G2[i]);

            parameters.G3[i] = [];
            for (j = 0; j < 3; j += 1) {
                parameters.G3[i][j] = ((this.random() % (parameters.B + parameters.B)) - parameters.B) / parameters.B;
            }
            parameters.G3[i] = this.normalize3(parameters.G3[i]);
        }

        for (i = parameters.B - 1; i >= 0; i -= 1) {
            k = parameters.P[i];
            parameters.P[i] = parameters.P[j = this.random() % parameters.B];
            parameters.P[j] = k;
        }

        for (i = 0; i < parameters.B + 2; i += 1) {
            parameters.P[parameters.B + i] = parameters.P[i];
            parameters.G1[parameters.B + i] = parameters.G1[i];
            for (j = 0; j < 2; j += 1) {
                parameters.G2[parameters.B + i][j] = parameters.G2[i][j];
            }
            for (j = 0; j < 3; j++) {
                parameters.G3[parameters.B + i][j] = parameters.G3[i][j];
            }
        }
    },
    random: function () {
        return parseInt(Math.random() * 256 * 256) & 0x7fffffff;
    },
    normalize2: function (arr) {
        var s = Math.sqrt(arr[0] * arr[0] + arr[1] * arr[1] + arr[2] * arr[2]);
        arr[0] = arr[0] / s;
        arr[1] = arr[1] / s;
        arr[2] = arr[2] / s;
        return arr;
    },
    normalize3: function (arr) {
        var s = Math.sqrt(arr[0] * arr[0] + arr[1] * arr[1]);
        arr[0] = arr[0] / s;
        arr[1] = arr[1] / s;
        return arr;
    },
    sCurve: function (t) {
        return t * t * (3.0 - 2.0 * t);
    },
    lerp: function (t, a, b) {
        return a + t * (b - a);
    },
    /**
     * Compute 1-dimensional Perlin noise.
     * @param x
     */
    noise1: function (x) {
        var bx0, bx1,
            rx0, rx1, sx, t, u, v;

        this.init();

        t = x + parameters.N;
        bx0 = parseInt(t) & parameters.BM;
        bx1 = (bx0 + 1) & parameters.BM;
        rx0 = t - parseInt(t);
        rx1 = rx0 - 1;

        sx = this.sCurve(rx0);

        u = rx0 * parameters.G1[parameters.P[bx0]];
        v = rx1 * parameters.G1[parameters.P[bx1]];

        return 2.3 * this.lerp(sx, u, v);
    },
    /**
     * Compute 2-dimensional Perlin noise
     * @param x
     * @param y
     * @returns {number}
     */
    noise2: function (x, y) {
        var bx0, bx1, by0, by1, b00, b10, b01, b11,
            rx0, rx1, ry0, ry1, q = [], sx, sy, a, b, t, u, v,
            i, j;

        this.init();

        t = x + parameters.N;
        bx0 = parseInt(t) & parameters.BM;
        bx1 = (bx0 + 1) & parameters.BM;
        rx0 = t - parseInt(t);
        rx1 = rx0 - 1;

        t = y + parameters.N;
        by0 = parseInt(t) & parameters.BM;
        by1 = (by0 + 1) & parameters.BM;
        ry0 = t - parseInt(t);
        ry1 = ry0 - 1;

        i = parameters.P[bx0];
        j = parameters.P[bx1];

        b00 = parameters.P[i + by0];
        b10 = parameters.P[j + by0];
        b01 = parameters.P[i + by1];
        b11 = parameters.P[j + by1];

        sx = this.sCurve(rx0);
        sy = this.sCurve(ry0);

        q = parameters.G2[b00];
        u = rx0 * q[0] + ry0 * q[1];
        q = parameters.G2[b10];
        v = rx1 * q[0] + ry0 * q[1];
        a = this.lerp(sx, u, v);

        q = parameters.G2[b01];
        u = rx0 * q[0] + ry1 * q[1];
        q = parameters.G2[b11];
        v = rx1 * q[0] + ry1 * q[1];
        b = this.lerp(sx, u, v);

        return 1.5 * this.lerp(sy, a, b);
    },
    /**
     * Compute 3-dimensional Perlin noise.
     * @param x
     * @param y
     * @param z
     */
    noise3: function (x, y, z) {
        var bx0, bx1, by0, by1, bz0, bz1, b00, b10, b01, b11,
            rx0, rx1, ry0, ry1, rz0, rz1, q, sy, sz, a, b, c, d, t, u, v,
            i, j;

        this.init();

        t = x + parameters.N;
        bx0 = parseInt(t) & parameters.BM;
        bx1 = (bx0 + 1) & parameters.BM;
        rx0 = t - parseInt(t);
        rx1 = rx0 - 1;

        t = y + parameters.N;
        by0 = parseInt(t) & parameters.BM;
        by1 = (by0 + 1) & parameters.BM;
        ry0 = t - parseInt(t);
        ry1 = ry0 - 1;

        t = z + parameters.N;
        bz0 = parseInt(t) & parameters.BM;
        bz1 = (bz0 + 1) & parameters.BM;
        rz0 = t - parseInt(t);
        rz1 = rz0 - 1;

        i = parameters.P[bx0];
        j = parameters.P[bx1];

        b00 = parameters.P[i + by0];
        b10 = parameters.P[j + by0];
        b01 = parameters.P[i + by1];
        b11 = parameters.P[j + by1];

        t = this.sCurve(rx0);
        sy = this.sCurve(ry0);
        sz = this.sCurve(rz0);

        q = parameters.G3[b00 + bz0];
        u = rx0 * q[0] + ry0 * q[1] + rz0 * q[2];
        q = parameters.G3[b10 + bz0];
        v = rx1 * q[0] + ry0 * q[1] + rz0 * q[2];
        a = this.lerp(t, u, v);

        q = parameters.G3[b01 + bz0];
        u = rx0 * q[0] + ry1 * q[1] + rz0 * q[2];
        q = parameters.G3[b11 + bz0];
        v = rx1 * q[0] + ry1 * q[1] + rz0 * q[2];
        b = this.lerp(t, u, v);

        c = this.lerp(sy, a, b);

        q = parameters.G3[b00 + bz1];
        u = rx0 * q[0] + ry0 * q[1] + rz1 * q[2];
        q = parameters.G3[b10 + bz1];
        v = rx1 * q[0] + ry0 * q[1] + rz1 * q[2];
        a = this.lerp(t, u, v);

        q = parameters.G3[b01 + bz1];
        u = rx0 * q[0] + ry1 * q[1] + rz1 * q[2];
        q = parameters.G3[b11 + bz1];
        v = rx1 * q[0] + ry1 * q[1] + rz1 * q[2];
        b = this.lerp(t, u, v);

        d = this.lerp(sy, a, b);

        return 1.5 * this.lerp(sz, c, d);
    },
    /**
     * Compute turbulence using Perlin noise.
     * @param x
     * @param y
     * @param z
     * @param octaves
     * @returns {*}
     */
    turbulence3: function (x, y, z, octaves) {
        var t = 0,
            i;
        for (i = 1; i <= octaves; i *= 2) {
            t += Math.abs(this.noise3(i * x, i * y, i * z)) / i;
        }
        return t;
    }
};

export default noise;
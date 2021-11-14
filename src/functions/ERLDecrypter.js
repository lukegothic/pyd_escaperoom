import { AES, enc, lib } from 'crypto-js';

const ERLDecrypter = {
    formatter: {
        stringify: (t) => {
            // NOT IMPLEMENTED
            console.log("sf", t);
        },
        parse: (t) => {
            var e = JSON.parse(t);
            var n = lib.CipherParams.create({
                ciphertext: enc.Base64.parse(e.ct)
            });
            return e.iv && (n.iv = enc.Hex.parse(e.iv)), e.s && (n.salt = enc.Hex.parse(e.s)), n;
        }
    },
    decrypt: function(encrypted) {
        const d = AES.decrypt(encrypted, "", { format: this.formatter });
        const s = d.toString(enc.Utf8);
        return s;
    }
};

export default ERLDecrypter;

const CryptoJS = require("crypto-js");
const { AES, enc, lib } = CryptoJS;

const ERLDecrypter = {
  formatter: {
    stringify: (cipherParams) => {
      const jsonObj = {
        ct: cipherParams.ciphertext.toString(enc.Base64),
      };
      if (cipherParams.iv) {
        jsonObj.iv = cipherParams.iv.toString();
      }
      if (cipherParams.salt) {
        jsonObj.s = cipherParams.salt.toString();
      }
      return JSON.stringify(jsonObj);
    },
    parse: (t) => {
      var e = JSON.parse(t);
      var n = lib.CipherParams.create({
        ciphertext: enc.Base64.parse(e.ct),
      });
      e.iv && (n.iv = enc.Hex.parse(e.iv));
      e.s && (n.salt = enc.Hex.parse(e.s));
      return n;
    },
  },
  decrypt: function (encrypted) {
    if (!encrypted) {
      throw new Error("Encrypted data is required");
    }
    // Ensure encrypted is a string
    const encryptedStr =
      typeof encrypted === "string" ? encrypted : JSON.stringify(encrypted);
    const d = AES.decrypt(encryptedStr, "", { format: this.formatter });
    const s = d.toString(enc.Utf8);
    return s;
  },
};

module.exports = ERLDecrypter;

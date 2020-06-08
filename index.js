"use strict";
const fpe = require("node-fpe");

class FPEncryptor {
  constructor(options = { password: null, domain: null }) {
    if (!options.password) {
      throw new Error("A valid password is needed for encrypting/decrypting");
    }
    this._cipher = null;
    if (options.domain) {
      this._cipher = fpe({
        password: options.password,
        domain: options.domain,
      });
    } else {
      this._cipher = fpe({ password: options.password });
    }
  }

  detachDelimiters(text, delimiters) {
    let delimiterList = [];
    if (text && delimiters) {
      for (let i = 0; i < text.length; i++) {
        const ch = text.charAt(i);
        if (delimiters.includes(ch))
          delimiterList.push({ delimiter: ch, index: i });
      }
      for (const delim of delimiters) {
        text = text.split(delim).join("");
      }
    }
    return { text, delimiterList };
  }

  attachDelimiters(text, delimiterList) {
    if (text && delimiterList) {
      for (let i = 0; i < delimiterList.length; i++) {
        const delimObj = delimiterList[i];
        const index = delimObj["index"];
        text = text.slice(0, index) + delimObj["delimiter"] + text.slice(index);
      }
    }
    return text;
  }

  encrypt(plainText, delimiters) {
    const { text, delimiterList } = this.detachDelimiters(
      plainText,
      delimiters
    );
    return this.attachDelimiters(this._cipher.encrypt(text), delimiterList);
  }

  decrypt(decText, delimiterChars) {
    const { text, delimiterList } = this.detachDelimiters(
      decText,
      delimiterChars
    );
    return this.attachDelimiters(this._cipher.decrypt(text), delimiterList);
  }
}

module.exports = FPEncryptor;

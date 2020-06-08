# node-fpe-pattern

Format-Preserving symmetric encryption in Node.js.
Wraps node-fpe, adding support to preserve the pattern of the text.

# Usage

const FPEncryptor = require('node-fpe-pattern');

const encryptor = new FPEncryptor({password: "secret",domain: ["O", "N", "E", "I", "S", "A", "L"]});

encryptor.encrypt("[ONE]+[IS]+[ALL],[ALL]+[IS]+[ONE]", ["[", "]", ",", "+"]);

// '[OLA]+[SE]+[NII],[NII]+[SE]+[OLA]'

encryptor.decrypt('[OLA]+[SE]+[NII],[NII]+[SE]+[OLA]', ["[", "]", ",", "+"]);

// '[ONE]+[IS]+[ALL],[ALL]+[IS]+[ONE]'

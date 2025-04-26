const fs = require("fs");
const path = require("path");
const ERLDecrypter = require("../ui/functions/ERLDecrypter");
const encryptedData = require("../data/escaperoomlover.company.all.json");

const decryptAndSaveJson = async () => {
  try {
    // Decrypt the data
    const decryptedData = ERLDecrypter.decrypt(encryptedData);

    // Save the decrypted data to a new file
    fs.writeFileSync(
      path.join(
        __dirname,
        "../data/escaperoomlover.company.all.decrypted.json"
      ),
      decryptedData,
      "utf8"
    );

    console.log("File successfully decrypted and saved!");
  } catch (error) {
    console.error("Error decrypting file:", error);
  }
};

// Run the decryption
decryptAndSaveJson();

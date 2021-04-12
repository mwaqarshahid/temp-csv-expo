
const FileSystem = require('expo-file-system');
const MediaLibrary = require('expo-media-library');
const Permissions = require('expo-permissions');

module.exports = {
  saveFileToDownloads: async (fileName, content) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      let fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
  },

  createCSVContent: (jsonArr, headers) => {
    let content = headers.join(",");
    content += "\n";
    content += jsonArr.map(row => {
      return Object.keys(row).map(key => `${row[key]}`).join(",")
    }).join("\n");
    return content;
  }
}
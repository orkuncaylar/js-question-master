// Please update this type as same as with the data shape.
interface File {
  id: string | number;
  name: string;
}
interface Folder {
  id: string | number;
  name: string;
  files: File[];
}
type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  const sourceFolderIndex = list
    ?.map((folder) => folder.files)
    ?.findIndex((folder) => folder?.findIndex((file) => file.id === source) >= 0);
  const sourceFileIndex = list?.[sourceFolderIndex]?.files?.findIndex((file) => file.id === source);
  const destinationFolderIndex = list?.findIndex((folder) => folder.id === destination);

  if (destinationFolderIndex < 0) {
    throw new Error('You cannot specify a file as the destination');
  }

  if (sourceFolderIndex < 0) {
    throw new Error('You cannot move a folder');
  }

  if (sourceFileIndex < 0) {
    throw new Error('You cannot move a file that does not exist');
  }

  const sourceFile = list[sourceFolderIndex]?.files?.[sourceFileIndex];
  list[destinationFolderIndex].files.push(sourceFile);
  list[sourceFolderIndex].files.splice(sourceFileIndex, 1);

  return list;
}

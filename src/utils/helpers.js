// get id by url
export function getId(url) {
  const id = Number(url.split("/")[url.split("/").length - 2]);
  return id;
}

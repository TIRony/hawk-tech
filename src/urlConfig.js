// const baseUrl = "https://hawk-tech-server.herokuapp.com";
// const baseUrl = "http://localhost:2000";
// const baseUrl = "https://ill-blue-panda-vest.cyclic.app";
export const api = `${baseUrl}/api`;

// for normal store
// export const generatePublicUrl = (fileName) => {
//   return `${baseUrl}/public/${fileName}`;
// };

// export const generatePublicUrl2 = (fileName) => {
//   return `${baseUrl}${fileName}`;
// };

// for cloudinary store
export const generatePublicUrl = (fileName) => {
  return `${fileName}`;
};

export const generatePublicUrl2 = (fileName) => {
  return `${fileName}`;
};

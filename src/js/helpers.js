import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// export const getJSON = async function (url) {
//   try {
//     const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await response.json();

//     if (!response.ok)
//       throw new Error(
//         `Cannot Found Recipe (${data.message} (${response.status})`
//       );

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`(${data.message} (${response.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await response.json();

//     if (!response.ok)
//       throw new Error(
//         `Failed to Upload the Recipe! Please Try again (${data.message} (${response.status})`
//       );

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

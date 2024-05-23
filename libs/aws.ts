import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { IdentityPoolId, albumBucketName, apiUrl, region } from "./secrets";

export function getAWSClient() {
  const client = new S3Client({
    region,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region },
      identityPoolId: IdentityPoolId,
    }),
  });

  console.log(client);

  return client;
}

export async function deleteS3Object(client: S3Client, photoKey: string) {
  const command = new DeleteObjectCommand({
    Bucket: albumBucketName,
    Key: photoKey,
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export async function postS3Object(
  client: S3Client,
  file: File,
  photoKey: string
) {
  const command = new PutObjectCommand({
    Bucket: albumBucketName,
    Key: photoKey,
    Body: file,
    ContentType: "image/jpeg",
  });

  console.log("send command!");
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}


// fetch API를 사용하여 POST 요청 보내기
export const putUser = () => {
  console.log("put!");

  const requestData = {
    userId: "1",
    username: "username",
    email: "user@example.com",
  };

  fetch(`${apiUrl}/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getUsers = () => {
  console.log("get users!");

  fetch(`${apiUrl}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const deleteUser = () => {
  console.log("delete!");

  fetch(`${apiUrl}/users/1`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


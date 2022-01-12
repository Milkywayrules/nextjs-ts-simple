// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

/**
 * All files in the "api" folder will be recognized as an endpoint. (ex. localhost:port/api/hello)
 *
 * All this api is a server code, specifically serverless function code.
 * If the project is not using any serverless function, delete the "api" folder.
 * This nextj-ts-simple project is not using any, but reserve this file as a documentation.
 *
 * So, this project is just consuming data from an API from anonymous(?) server out there.
 */

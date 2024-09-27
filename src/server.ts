import http from "http";
import app from "./App";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, (error?: string) => {
  if (error) {
    console.error("error with starting the server");
  } else {
    console.log(
      `Server is running on port ${port}\nwaiting for mongoose connection...`
    );
  }
});

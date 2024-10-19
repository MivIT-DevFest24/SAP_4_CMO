import jwt from "jsonwebtoken";

const isUser = (req, res, next) => {
  try {
    if (req.params.connected === "false")
      return res.status(201).send({ message: false });
    // get the token from the request header and remove the Bearer string
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

const isOperator = (req, res, next) => {
  try {
    // get the token from the request header and remove the Bearer string
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      if (decoded.role !== "operator") {
        return res.status(403).send({ message: "Require Operator Role!" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

const isManager = (req, res, next) => {
  try {
    // get the token from the request header and remove the Bearer string
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      if (decoded.role !== "manager") {
        return res.status(403).send({ message: "Require Manager Role!" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

export { isUser, isManager, isOperator };

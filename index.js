const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/categoryRoute");
const blogcategoryRouter = require("./routes/blogCategoryRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");
const cors = require("cors");
const morgan = require("morgan");

dbConnect();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/v1/api/user", authRouter);
app.use("/v1/api/product", productRouter);
app.use("/v1/api/coupon", couponRouter);
app.use("/v1/api/brand", brandRouter);
app.use("/v1/api/blogcategory", blogcategoryRouter);
app.use("/v1/api/category", categoryRouter);
app.use("/v1/api/blog", blogRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`running ${PORT}`);
});

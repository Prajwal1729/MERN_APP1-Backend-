import mongoose from "mongoose";

const leftMenuSchema = new mongoose.Schema({
  menu: [
    {
      name: String,
      path: String
    }
  ]
});

const LeftMenu = mongoose.model("LeftMenu", leftMenuSchema, "leftmenu");

export default LeftMenu;
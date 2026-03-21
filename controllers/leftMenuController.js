import LeftMenu from "../models/LeftMenu.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const getleftMenu = async(req,res)=>{
    try{
        
        const data = await LeftMenu.findOne();
        //console.log(data,"leftmenudata");

        if(!data || data.length === 0){
            return res.status(200).json({
                message: "Menu not found."
            })
        }

        return res.status(200).json(data.menu)

    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error."
        });
    }
}

export default getleftMenu;

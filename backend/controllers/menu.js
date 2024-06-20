import { Menu } from "../models/menu.js";

export const getAllMenus = async (req,res) => {
    try
    {
        const menu_items = await Menu.find()
        return res.status(200).json({menu_items})
    }
    catch (error)
    {
        return res.status(500).json({error : error.message})
    }
}

export const createMenuItem = async (req,res) => {
    try
    {
        const {name,description,price} = req.body
        if(!name || !description || !price)
        {
            return res.status(400).json({error : "Please fill in the required fields"})
        }
        const menu_item = await Menu.create({
            item_name : name,
            description : description,
            price : price,
        })
        return res.status(201).json(menu_item)
    }
    catch (error)
    {
        return res.status(500).json({error : error.message})
    }
}
import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    };

    const trx = await knex.transaction();

    const insertedIds = trx("points").insert(point);

    const pointId = insertedIds[0];

    const pointItems = items.map((itemId: number) => {
      return {
        item_id: itemId,
        point_id: pointId,
      };
    });

    trx("points_items").insert(pointItems);

    return response.json({ id: pointId, ...point });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();

    if (!point)
      return response.status(400).json({ message: "Point not found." });

    const items = await knex("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", id)
      .select("items.title");

    return response.json({ point, items });
  }
}

export default PointsController;

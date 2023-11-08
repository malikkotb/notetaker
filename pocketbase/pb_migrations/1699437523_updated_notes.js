/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yg7jrs6cequ011k")

  // remove
  collection.schema.removeField("pnlqxlya")

  // remove
  collection.schema.removeField("zzbpwnxx")

  // remove
  collection.schema.removeField("aq1dsmgj")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yg7jrs6cequ011k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pnlqxlya",
    "name": "noteId",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zzbpwnxx",
    "name": "createdAt",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aq1dsmgj",
    "name": "modifiedAt",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})

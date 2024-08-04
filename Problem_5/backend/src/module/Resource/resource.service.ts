import { Request } from "express";
import * as repo from "./resource.repository";

export async function createResource(req: any) {
  const data = {
    name: req.name,
    description: req.description ?? "",
  }
  return await repo.createNewResource(data);
}
export async function getAllResource() {
  return await repo.getAllResource();
}
export async function getDetailResource(id: number) {
  return await repo.getDetailResource(id);
}
export async function filterResource(name: string) {
  return await repo.filterResource(name);
}
export async function updateResource(id: number, name:string, desciption: string) {
  await repo.updateResource(id, name, desciption);
}
export async function deleteResource(id: number) {
  await repo.deleteResource(id);
}
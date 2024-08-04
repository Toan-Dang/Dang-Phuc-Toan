import {resourceRepository } from "../../config/postgres";

export async function createNewResource(data: any) {
  try {
    return await resourceRepository.save(data);
  } catch (error) {
    console.error("createNewAccount repository error", error);
  }
}

export async function getAllResource() {
  try {
    return await resourceRepository.find();
  } catch (error) {
    console.error("getAllResource repository error", error);
  }
}

export async function getDetailResource(id: number) {
  try {
    return await resourceRepository.findOne({
      where: {
        resource_id: id,
      }
    });
  } catch (error) {
    console.error("getDetailResource repository error", error);
    return [];
  }
}

export async function filterResource(name: string) {
  try {
    return await resourceRepository.find({
      where: {
        name: name,
      }
    });
  } catch (error) {
    console.error("getFilterResource repository error", error);
    return [];
  }
}

export async function updateResource(id: number,name: string, description: string) {
  try {
    const resource = await resourceRepository.findOne({
      where: {
        resource_id: id
      }
    });
    if (!resource) {
      throw new Error("Resource not found");
    }
    resource.name = name;
    resource.description = description;
    return resourceRepository.save(resource);
  } catch (error) {
    console.error("updateResource repository error", error);
  }
}

export async function deleteResource(id: number) {
  try {
    return await resourceRepository.delete(id);
  } catch (error) {
    console.error("deleteResource repository error", error);
  }
}
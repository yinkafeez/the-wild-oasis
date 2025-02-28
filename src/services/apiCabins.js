import supabase, { supabaseUrl } from "./supabase";

// fetch table
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

// create cabin
export async function createEditCabin(newCabin, id) {
  // checking if the image starts with the supabase url
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/Edit cabin

  let query = supabase.from("cabins");

  // A) CREATE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  const { data, error } = await query.select().single();

  // B) EDIT CABIN
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", "id")
      .select();

  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }

  // 2. uplaod image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

// delete cabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }

  return data;
}

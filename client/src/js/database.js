import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// saves the content of the editor to the database
export const putDb = async (content) => {
  const jate = await openDB("jate", 1);
  const tx = jate.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ text: content });
  const result = await request;
  console.log("data saved to db.", result);
};

// retrieves the content of the editor from the database
export const getDb = async () => {
  const jate = await openDB("jate", 1);
  const tx = jate.transaction("jate", 1);
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result.value;
};

initdb();

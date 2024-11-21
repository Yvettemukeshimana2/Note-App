 import { useEffect, useState } from "react";
 import { db } from "../firebaseConfig";
 import {
   collection,
   addDoc,
   getDocs,
   updateDoc,
   deleteDoc,
   doc,
 } from "firebase/firestore";

 interface Note {
   id: string;
   text: string;
 }

 const NotePage = () => {
   const [notes, setNotes] = useState<Note[]>([]); // Notes array
   const [noteText, setNoteText] = useState<string>(""); // Current input value
   const [editIndex, setEditIndex] = useState<number | null>(null); // Index of the note being edited

   const notesCollection = collection(db, "notes");

   // Fetch notes from Firestore
   useEffect(() => {
     const fetchNotes = async () => {
       try {
         const data = await getDocs(notesCollection);
         const fetchedNotes = data.docs.map((doc) => ({
           id: doc.id,
           text: doc.data().text as string,
         }));
         setNotes(fetchedNotes);
       } catch (error) {
         console.error("Error fetching notes:", error);
       }
     };

     fetchNotes();
   }, []);

   // Add or update a note
   const handleAddOrUpdateNote = async () => {
     if (noteText.trim() === "") return;

     try {
       if (editIndex !== null) {
         // Update existing note
         const noteToUpdate = notes[editIndex];
         const noteDoc = doc(db, "notes", noteToUpdate.id);
         await updateDoc(noteDoc, { text: noteText });

         const updatedNotes = notes.map((note, index) =>
           index === editIndex ? { ...note, text: noteText } : note
         );
         setNotes(updatedNotes);
         setEditIndex(null);
       } else {
         // Add a new note
         const newNoteRef = await addDoc(notesCollection, { text: noteText });
         setNotes([...notes, { id: newNoteRef.id, text: noteText }]);
       }
       setNoteText("");
     } catch (error) {
       console.error("Error adding/updating note:", error);
     }
   };

   // Set note for editing
   const handleEditNote = (index: number) => {
     setEditIndex(index);
     setNoteText(notes[index].text);
   };

   // Delete a note
   const handleDeleteNote = async (index: number) => {
     const noteToDelete = notes[index];
     try {
       const noteDoc = doc(db, "notes", noteToDelete.id);
       await deleteDoc(noteDoc);

       setNotes(notes.filter((_, i) => i !== index));
     } catch (error) {
       console.error("Error deleting note:", error);
     }
   };

   return (
     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
       <h1 className="text-2xl font-bold mb-4">Notes</h1>
       <div className="mb-4 flex items-center space-x-2">
         <input
           type="text"
           value={noteText}
           onChange={(e) => setNoteText(e.target.value)}
           placeholder="Enter your note"
           className="border rounded px-4 py-2 w-64"
         />
         <button
           onClick={handleAddOrUpdateNote}
           className={`px-4 py-2 rounded text-white ${
             editIndex !== null
               ? "bg-yellow-500 hover:bg-yellow-600"
               : "bg-blue-500 hover:bg-blue-600"
           }`}
         >
           {editIndex !== null ? "Update Note" : "Add Note"}
         </button>
       </div>
       {notes.length === 0 ? (
         <p className="text-gray-500">
           No notes available. Add your first note!
         </p>
       ) : (
         <ul className="w-64">
           {notes.map((note, index) => (
             <li
               key={note.id}
               className="flex justify-between items-center bg-white p-2 mb-2 shadow rounded"
             >
               <span className="text-gray-700">{note.text}</span>
               <div className="flex space-x-2">
                 <button
                   onClick={() => handleEditNote(index)}
                   className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                 >
                   Edit
                 </button>
                 <button
                   onClick={() => handleDeleteNote(index)}
                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                 >
                   Delete
                 </button>
               </div>
             </li>
           ))}
         </ul>
       )}
     </div>
   );
 };
 export default NotePage;
import './App.scss';
import {useEffect, useState} from "react";
import Announcement from "./components/Announcement";

function App() {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [edit, setEdit] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const items = localStorage.getItem("announcements");
        const loadedAnnouncements = JSON.parse(items);

        loadedAnnouncements && setAnnouncements(loadedAnnouncements);
    }, []);

    useEffect(() => {
        const json = JSON.stringify(announcements);
        localStorage.setItem("announcements", json);
    }, [announcements])

    const generateDate = () => {
        return `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAnnouncement = {
            id: new Date().getTime(),
            title: title,
            description: description,
            date: generateDate()
        }

        if (title.length === 0 || description.length === 0) {
            alert("Please insert a value!");
        } else {
            setAnnouncements([...announcements].concat(newAnnouncement));
            setTitle("");
            setDescription("");
        }
    }

    const deleteAnnouncement = (id) => {
        const updateAnnouncement = [...announcements].filter((todo) => todo.id !== id);
        setAnnouncements(updateAnnouncement);
    }

    const editAnnouncement = (id) => {
        const updatedAnnouncement = [...announcements].map((item) => {
            if (item.id === id && (newTitle.length > 0 && newDescription.length > 0)) {
                item.title = newTitle;
                item.description = newDescription;
            }
            return item;
        })
        setAnnouncements(updatedAnnouncement);
        setEdit(null);
        setNewTitle("");
        setNewDescription("");
    }

    return (
        <>
            <div className="container">
                <h1 className="header">Announcements</h1>
                <div className="search">
                    <label className="search__label" htmlFor="search">Search</label>
                    <input className="search__input" id="search" type="text" placeholder="Search by title"
                           onChange={(e) => {
                               setSearch(e.target.value);
                           }}/>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__box">
                        <label htmlFor="title" className="form__label">
                            Title</label>
                        <input id="title" className="form__input" type="text" onChange={(e) => setTitle(e.target.value)}
                               value={title}/>
                    </div>
                    <div className="form__box">
                        <label htmlFor="description" className="form__label"> Description</label>
                        <input id="description" className="form__input" type="text"
                               onChange={(e) => setDescription(e.target.value)}
                               value={description}/>
                    </div>
                    <button type="submit" className="form__btn">Add Announcement</button>
                </form>
            </div>
            {announcements.filter((item) => {
                if (search === "") {
                    return item;
                } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
                    return item;
                }
            }).map((item) => (
                <Announcement item={item} key={item.id} editAnnouncement={editAnnouncement}
                              deleteAnnouncement={deleteAnnouncement} edit={edit} setEdit={setEdit}
                              newTitle={newTitle}
                              setNewTitle={setNewTitle}
                              newDescription={newDescription}
                              setNewDescription={setNewDescription}
                              announcements={announcements}
                />
            ))}
        </>
    );
}

export default App;

import React, { useState, useEffect, useContext } from "react"
import RepoCard from "./RepoCard"
import { AuthContext } from "../App"
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


export default function Repos() {
    const { state } = useContext(AuthContext)
    const [search, setSearch] = useState("")
    const [repos, setRepos] = useState([])
    const [addNew, setAddNew] = useState(false)
    const [followUnfollow, setFollowUnfollow] = useState(false)

    useEffect(() => {
        if (!addNew) {
            fetch(`http://localhost:3001/following/repository?user_name=${state.username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw res
                }
            })
            .then(resJson => {
                setRepos(resJson)
            })
        } else {
            fetch(`http://localhost:3001/repository?user_name=${state.username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw res
                }
            })
            .then(resJson => {
                setRepos(resJson)
            })
        }
    }, [addNew, followUnfollow]) // TODO: can add search to the trigger variables and do a fetch with MYSQL Query for search

    // TODO: Should probably actually do filtering with SQL...
    const reposToDisplay = repos
                            .filter(repo => repo.name.toLowerCase().includes(search.toLowerCase()))
                            .map(repo => <RepoCard 
                                            key={repo.id} 
                                            name={repo.name} 
                                            description={repo.description} 
                                            following={!addNew} 
                                            followUnfollowCallback={() => setFollowUnfollow(!followUnfollow)}
                                        />)

    return (
        <div>
            <InputGroup className="mb-3" style={{width: "40rem", margin: "1rem"}}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                />
                <Button 
                    variant="outline-dark" 
                    style={{ marginLeft: "1rem" }}
                    onClick={(event) => setAddNew(!addNew)}
                >{addNew ? "← Back" : "Follow New"}</Button>
            </InputGroup>

        {reposToDisplay}
        </div>
    )
}
import React, { useState, useEffect, useContext } from "react"
import IssueCard from "./IssueCard.js"
import IssueView from "./IssueView.js"
import { AuthContext } from "../App.js"


export default function Feed() {
    const [issues, setIssues] = useState([])
    const [chosenIssue, setChosenIssue] = useState()
    const { state } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3001/feed?user_name=${state.username}`, {
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
            console.log(resJson)
            setIssues(resJson)
        })
    }, [])

    // Notification logic will need to be more ... logical :) Should do it in SQL!
    const issuesToDisplay = issues
                                .map(issue => <IssueCard 
                                                    key={issue.id} 
                                                    issueObj={issue}
                                                    id={issue.id}
                                                    title={issue.title} 
                                                    repository_name={issue.repository_name}
                                                    user={issue.username} 
                                                    date={new Date(issue.created_at * 1000).toISOString().split('T')[0]}
                                                    notif={issue.updated_at > state.lastLogin} 
                                                    chooseIssueCallback={(issue) => setChosenIssue(issue)}
                                                />
                                    )

    return (
        <div>
            {issuesToDisplay}
            <IssueView
                showIssueView={chosenIssue != null}
                setChosenIssue={() => setChosenIssue(null)}
                id={chosenIssue != null ? chosenIssue.id : null}
                title={chosenIssue != null ? chosenIssue.title : null}
            />
        </div>
    )
}

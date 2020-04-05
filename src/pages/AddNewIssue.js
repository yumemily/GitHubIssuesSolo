import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';

const apiURL = `https://api.github.com`;

export default function AddNewIssue(props) {

    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    console.log(props.owner)
    // use params
    const { owner, repo } = useParams()
    const history = useHistory()

    const handleSubmitNewIssue = async () => {
        if (!title) {
            alert("Please insert a title")
            return;
        }
        const issue = { "title": title, "body": details };
        const url = `${apiURL}/repos/${owner}/${repo}/issues`;
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `token ${props.token}`
                },
                body: JSON.stringify(issue),
            }
        );
        console.log(response)
        if (response.status === 201) {
            setTitle("");
            setDetails("");
            history.goBack()
        }
    }

    return (
        <div className='container'>
            <h4 className='py-5'>Add New Issue</h4>
            <div class="form-group">
            <label for="title">Title:</label>
                <textarea onChange={e => setTitle(e.target.value)} class="form-control" rows="5" id="comment"></textarea>
                <label for="comment">Comment:</label>
                <textarea onChange={e => setDetails(e.target.value)} class="form-control" rows="5" id="comment"></textarea>
            </div>
            <div>
                <button onClick={handleSubmitNewIssue}>Submit</button>
            </div>
        </div>
    )
}

import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR,ALL_AUTHORS } from "../queries"
import { set } from "express/lib/application"
import Select from 'react-select';
 const UpdateBirth = (props) => {

    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [updateAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
      })
    const [selectedOption, setSelectedOption] = useState(props.authors[0]);
      const submit = async (event) => {
        event.preventDefault() 

        await updateAuthor({
            variables: { name: selectedOption.value, setBornTo: Number(birth) }}
        )

        setName('')
        setBirth('')
      }

    return (
        <div>
            <h2>update author</h2>
            <form onSubmit={submit}>

                {/* <div>
                name
                <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
                </div> */}
                <Select defaultValue= {selectedOption} onChange={setSelectedOption} options={props.authors.map((author) => ({ value: author.name, label: author.name }))}  />
                <div>
                born
                <input
                    value={birth}
                    onChange={({ target }) => setBirth(target.value)}
                />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )


}

export default UpdateBirth
import React, { useEffect, useRef, useState } from "react";



const DynamicForm = () => {



    var personelRef = useRef([]);

    const [description, setDescription] = useState([]);



    const personel = [

        { id: 0, tipId: 1, name: 'ahmet', age: '34' },

        { id: 1, tipId: 2, name: 'mehmet', age: '30' },

        { id: 2, tipId: 0, name: 'ali', age: '28' }];



    const tipler = [

        { id: 0, tipAdi: "stajer", description: 'stajerlere özel bir tanım' },

        { id: 1, tipAdi: "yeni başlayan", description: 'yeni başlayan çalışanlara özel bir tanım' },

        { id: 2, tipAdi: "kıdemli", description: 'kıdemli çalışanlara özel bir tanım' }

    ]

    personelRef.current = personel.map((p, index) => { return React.createRef() });


    useEffect(() => {

        setDescription(personel.map(p => { return tipler.find(t => t.id === p.tipId).description }));

    }, []);



    const descriptionChangeHandler = (e) => {

        var desc = [...description];

        desc[e.target.id] = e.target.value;

        setDescription(desc);

    }



    const handleTipChange = (e) => {

        var id = e.target.getAttribute("data-id");

        console.log(personel[id]);

        personelRef.current[id].current.childNodes[3].childNodes[0].value =

            tipler.find(t => t.id === Number(e.target.selectedOptions[0].value)).description;

    }

    const postData = (e) => {

        console.log(personelRef);



    }

    return (

        <>

            <table>

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Age</th>

                        <th>Description</th>

                        <th>Type</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        personel && personel.map((p, index) => {

                            return (

                                <tr key={index} ref={personelRef.current[index]}>

                                    <td>{p.name}</td>

                                    <td>{p.age}</td>

                                    <td>

                                        <select data-id={index} key={"tip" + index} name="slcTip" defaultValue={p.tipId}

                                            onChange={e => handleTipChange(e)}>

                                            {

                                                tipler.map((t, indexTip) => {

                                                    return (<option key={"tipOpt" + indexTip} id={"tipOpt_" + indexTip} value={t.id}>{t.tipAdi}</option>)

                                                })

                                            }

                                        </select>

                                    </td>

                                    <td>

                                        <input id={index} type="text" value={description[p.id]}

                                            onChange={e => { descriptionChangeHandler(e) }}>

                                        </input>

                                    </td>



                                </tr>

                            )

                        })

                    }

                </tbody>

            </table>

            <div>

                <input type="button" value="Gönder" onClick={e => postData(e)}></input>

            </div>

        </>

    );

}



export default DynamicForm;
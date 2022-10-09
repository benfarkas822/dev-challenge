import React, {useEffect, useState} from 'react';
import Image from "next/image";
import placeholderImage from "../../../assets/placeholder.png";

const EditContact = ({setContacts, editContact, setEditContact}) => {
    const [edit, setEdit] = useState()
    const [fileBase64, setFileBase64] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        getContactInfos().then(r => {
            setEdit(r);
            setFileBase64(r.photo);
            setName(r.name);
            setPhoneNumber(r.phone_number);
            setEmail(r.email)
        })
    }, [])

    const getContactInfos = async () => {
        const response = await fetch('/api/contacts/' + editContact);
        return await response.json();
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await fetch('/api/contacts/' + editContact, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                photo: fileBase64 ? fileBase64 : placeholderImage.src,
                name: name,
                phoneNumber: phoneNumber,
                email: email
            })
        })
        await fetch('/api/contacts').then(async response => {
            await setContacts(await response.json());
            setEditContact(null)
        })
    }

    const handleFileRead = async event => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file)
        setFileBase64(base64)
    }
    const convertBase64 = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleNameChange = e => {
        setName(e.target.value)
    }
    const handlePhoneNumberChange = e => {
        setPhoneNumber(e.target.value)
    }
    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    return (
        <div
            className='absolute top-0 bottom-0 left-0 right-0  flex flex-col justify-center h-full bg-black/20 dark:bg-black/70'>
            <div
                className='flex flex-col max-w-full mx-4 p-6 md:w-1/2 lg:w-[368px] md:mx-auto bg-stone-50 dark:bg-[#141414] z-10 p-5'>
                <h2 className={'text-2xl'}>Edit Contact</h2>
                <form className='flex flex-col gap-y-6 h-full' onSubmit={handleSubmit}>
                    <div className="flex items-center gap-x-5 my-4">
                        <Image src={!fileBase64 ? placeholderImage : fileBase64} alt="contact image"
                               className='rounded-full' width='88' height='88'/>
                        {!fileBase64 ? <label htmlFor={'contactProfile'} className={'btn-form'}>
                            <svg width="14" height="14" viewBox="0 0 14 14"
                                 className={'svg w-[14px] h-[14px] hover:fill-black hover:dark:fill-white'}
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.25 13.75V7.75H0.25V6.25H6.25V0.25H7.75V6.25H13.75V7.75H7.75V13.75H6.25Z"
                                />
                            </svg>
                            Add picture </label> : <><label htmlFor={'contactProfile'} className={'btn-form'}>
                            <svg width="16" height="22" viewBox="0 0 16 22"
                                 className={'svg w-[16px] h-[22px] hover:fill-black hover:dark:fill-white'}
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.65 4.0001L7.975 7.6501L6.925 6.6001L8.775 4.7501H8C6.26667 4.7501 4.79167 5.36243 3.575 6.5871C2.35833 7.81243 1.75 9.3001 1.75 11.0501C1.75 11.4668 1.796 11.8791 1.888 12.2871C1.97933 12.6958 2.11667 13.1001 2.3 13.5001L1.175 14.6251C0.875 14.0584 0.646 13.4751 0.488 12.8751C0.329333 12.2751 0.25 11.6668 0.25 11.0501C0.25 8.88343 1.00433 7.04176 2.513 5.5251C4.021 4.00843 5.85 3.2501 8 3.2501H8.775L6.925 1.4001L7.975 0.350098L11.65 4.0001ZM4.35 18.0001L8.025 14.3501L9.075 15.4001L7.225 17.2501H8C9.73333 17.2501 11.2083 16.6378 12.425 15.4131C13.6417 14.1878 14.25 12.7001 14.25 10.9501C14.25 10.5334 14.2043 10.1208 14.113 9.7121C14.021 9.3041 13.8833 8.9001 13.7 8.5001L14.825 7.3751C15.125 7.94176 15.3543 8.5251 15.513 9.1251C15.671 9.7251 15.75 10.3334 15.75 10.9501C15.75 13.1168 14.996 14.9584 13.488 16.4751C11.9793 17.9918 10.15 18.7501 8 18.7501H7.225L9.075 20.6001L8.025 21.6501L4.35 18.0001Z"
                                />
                            </svg>
                            Change picture </label>
                            <div className="btn-form px-2.5" onClick={() => setFileBase64(null)}>
                                <svg width="12" height="15" viewBox="0 0 12 15" className={'svg'}
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.91667 12.8332H9.08333C9.13889 12.8332 9.19444 12.8054 9.25 12.7498C9.30556 12.6943 9.33333 12.6387 9.33333 12.5832V4.49984H2.66667V12.5832C2.66667 12.6387 2.69444 12.6943 2.75 12.7498C2.80556 12.8054 2.86111 12.8332 2.91667 12.8332ZM0.6875 2.24984V0.999837H3.16667L4 0.166504H8L8.83333 0.999837H11.3125V2.24984H0.6875ZM2.91667 14.0832C2.5 14.0832 2.14583 13.9373 1.85417 13.6457C1.5625 13.354 1.41667 12.9998 1.41667 12.5832V3.24984H10.5833V12.5832C10.5833 12.9998 10.4375 13.354 10.1458 13.6457C9.85417 13.9373 9.5 14.0832 9.08333 14.0832H2.91667ZM2.66667 12.8332H9.33333C9.33333 12.8332 9.30556 12.8332 9.25 12.8332C9.19444 12.8332 9.13889 12.8332 9.08333 12.8332H2.91667C2.86111 12.8332 2.80556 12.8332 2.75 12.8332C2.69444 12.8332 2.66667 12.8332 2.66667 12.8332Z"
                                    />
                                </svg>
                            </div>
                        </>}
                        <input type="file" id={'contactProfile'} onChange={handleFileRead} className={'hidden'}/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="name" className={'text-[#00000056] dark:text-[#ffffff56]'}>Name</label>
                        <input type="text" id={'name'} className={'form-input'} value={name} onChange={handleNameChange}
                               placeholder={'Jamie Wright'} required={true}/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="phone" className={'text-[#00000056] dark:text-[#ffffff56]'}>Phone number</label>
                        <input type="tel" id={'phone'} className={'form-input'} value={phoneNumber}
                               onChange={handlePhoneNumberChange}
                               placeholder={'+01 234 5678'} required={true}/>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className={'text-[#00000056] dark:text-[#ffffff56]'}>Email
                            address</label>
                        <input type="email" id={'email'} className={'form-input'} value={email}
                               onChange={handleEmailChange}
                               placeholder={'jamie.wright@mail.com'} required={true}/>
                    </div>
                    <div className="flex justify-end gap-x-3 mt-10">
                        <div className="btn-secondary" onClick={() => setEditContact(null)}>Cancel</div>
                        <button type=' submit' className={'btn-form'}>Done</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default EditContact;

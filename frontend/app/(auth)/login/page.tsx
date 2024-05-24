'use client'

import {FormEvent} from 'react'
import styles from './Login.module.css'
import {useRouter} from 'next/navigation'


export default function Login() {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        // const email = formData.get('email')
        // const password = formData.get('password')

        router.push('/home')

    }

    return (
        <div className={styles.body}>
            <div className={styles.main}>
                <h1><b>Login</b></h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Username:
                    </label>
                    <input type="email" name="email" placeholder="Email" required className={styles.input} value="a@gmail.com"/>

                    <label className={styles.label}>
                        Password:
                    </label>
                    <input type="password" name="password" placeholder="Password" required className={styles.input} value="123"/>
                    <div className={styles.wrap}>
                        <button type="submit" className={styles.button}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
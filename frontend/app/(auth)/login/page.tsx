'use client'

import {FormEvent} from 'react'
import styles from './Login.module.css'
import {useRouter} from 'next/navigation'
import {fetchLogin} from "@/api/login";


export default function Login() {
    const router = useRouter()
    let showError = false

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')?.toString()!
        const password = formData.get('password')?.toString()!

        const response = await fetchLogin(email, password)

        if (response != 401) {
            console.log(response);
            router.push('/home')
        } else {
            showError = true
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.main}>
                <h1><b>Login</b></h1>
                {showError ? (
                    <label className={styles.label}>
                        Falsch
                    </label>
                ) : null
                }
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Username:
                    </label>
                    <input type="email" name="email" placeholder="Email" required className={styles.input}
                           value="su@test.com"/>

                    <label className={styles.label}>
                        Password:
                    </label>
                    <input type="password" name="password" placeholder="Password" required className={styles.input}
                           value="password7"/>
                    <div className={styles.wrap}>
                        <button type="submit" className={styles.button}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
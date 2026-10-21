
export async function apiFetch(path, method = "GET", body) {    
        const base_URL= import.meta.env.VITE_API_URL
        const token = localStorage.getItem('token')
        const headers = {
            "Content-Type": "application/json",
        }
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }

        // fetch with all constant managed
        const res = await fetch(base_URL+path, {
            method: method,
            body: JSON.stringify(body),
            headers: headers
        })
        if (!res.ok) {
            const data = await res.json()
            const error = new Error(`HTTP error ${res.status} : ${data.error}`)  
            error.errors = data.errors      //add errors for details ex: in a form  => "email is required" ...
            error.status = res.status                                     
            throw error
        }
        if (res.status === 204) { //succes on a delete
            return null 
        }
        const data = await res.json()
        return data
}
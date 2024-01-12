

import { auth ,signOut} from '@/auth'

const SettingPage =async () => {
    const session = await auth();
  return (
    <div>
        <h1>SettingPage</h1>
        <p>{JSON.stringify(session)}</p>

        <br/>

        <form action={async ()=>{
          "use server"

          await signOut();
        }}>
          <button type='submit'>Logout</button>
        </form>
    </div>
  )
}

export default SettingPage
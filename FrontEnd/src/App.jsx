import SourceLanguage from './components/SourceLanguage'
import TargetLanguage from './components/TargetLanguage'

function App() {
    return (
        <main className='grid min-h-screen gap-6 bg-hero bg-cover bg-top bg-no-repeat py-6 lg:grid-cols-2 lg:place-content-center'>
            <SourceLanguage />
            <TargetLanguage />
        </main>
    )
}

export default App

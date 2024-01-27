import {Header} from "@/components/auth/header"
import BackButton from './BackButton';
import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card"


export default function ErrorCard() {
  return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Oops! Something went wrong"/>
            </CardHeader>
            <CardFooter>
                <BackButton 
                label="Back to Login"
                href="/auth/login"
                />
            </CardFooter>
        </Card>
    )
}



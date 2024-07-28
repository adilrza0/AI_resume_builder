import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

import GlobalApi from '../../../service/GlobalApi.js'


export default function SingInPage() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate()
  const [fromPath] = useState(location.state?.from || '/');
  console.log(fromPath)
  

  const handleRegister =()=>{
    GlobalApi.Register({email,password,username})
    .then((res)=>{
      console.log(res.data)
      localStorage.setItem('token',res.data.token)
      navigate(`${fromPath}`)
    })
    .catch((err)=>{
      console.error(err)
    })
    
  }

  const handleLogin =()=>{
    GlobalApi.Login({email,password})
    .then((res)=>{
      console.log(res.data)
      localStorage.setItem('token',res.data.token)
      navigate(`${fromPath}`)
    })
    .catch((err)=>{
      console.log(err)
    })
    

  }
  return (
    <div>
      {login ? (
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input value={password} id="password" type="password" required onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            Not have an account?{" "}
            <Link onClick={() => setLogin(false)} className="text-blue-500">
              {" Sign up"}
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">UserName</Label>
              <Input value={username} id="name" placeholder="John Doe" required  onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                id="email"
                type="email"
                placeholder="example@email.com"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input value={password} id="password" type="password" required  onChange={(e)=>setPassword(e.target.value)}  />
            </div>
            <Button type="submit" className="w-full" onClick={handleRegister} >
              Create Account
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link onClick={() => setLogin(true)} className="text-blue-500">
              {" Sign in"}
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

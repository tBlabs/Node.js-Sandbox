/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

import { Auth } from "../services/auth";
import { guid } from "../types";
import { User } from "../framework/User";
import { Claims } from "../framework/Claims";

xdescribe('auth service', () =>
{
    let auth: Auth = new Auth();
    let guid: guid = "12341234-1234-1234-1234-123412341234";

    it('should generate JWT token', () =>
    {
        let user: User = new User();
        user.id = guid;
        user.claims = new Claims();

        let token = auth.GenerateTokenForUser(user); // Tam w środku jest random którego trzeba by jakoś zmokować....
        console.log(token);

        let decodedUser: User = auth.ExtractUserFromToken(token);

        console.log(decodedUser);
        

        // ....dlatego taki test odpada!
//        let expectedToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyYW5kb20iOiIxNTM4YTZjYS02MTFiLTQwYTItOTNhOS0wZjY2ZjY4YWViMjciLCJjcmVhdGlvblRpbWUiOiIyMDE3LTA1LTA4VDE1OjQ1OjQ0LjA3M1oiLCJleHBpcmF0aW9uVGltZSI6IjIwMTctMDgtMTZUMTU6NDU6NDQuMDczWiIsInVzZXJJZCI6IjEyMzQxMjM0LTEyMzQtMTIzNC0xMjM0LTEyMzQxMjM0MTIzNCIsInVzZXJDbGFpbXMiOnsiY2FuQWRkTm90ZSI6ZmFsc2UsImNhblJlYWROb3RlIjpmYWxzZSwiY2FuRGVsZXRlTm90ZXMiOmZhbHNlLCJjYW5DaGFuZ2VOb3RlIjpmYWxzZX19.vx7VdKqIxzF8OIkzl1LmZO66Yx6l_hN55XVaLaglYd8";
  //      expect(token).toBe(expectedToken);   
    });  
});
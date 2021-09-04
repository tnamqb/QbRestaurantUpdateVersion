package com.codegym.restaurant.service.token;


import com.codegym.restaurant.model.Token;

public interface ITokenService {

    Token createToken(Token token);

    Token findByToken(String token);
}

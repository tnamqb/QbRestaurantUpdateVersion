package com.codegym.restaurant.service.category;

import com.codegym.restaurant.model.Category;
import com.codegym.restaurant.service.IGeneralService;

import java.util.Optional;

public interface ICategoryService  extends IGeneralService<Category> {

    Optional<Category> findCategoryByCategoryName(String categoryName);
}

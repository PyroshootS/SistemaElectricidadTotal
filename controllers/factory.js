
import { writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import { validateUser } from "../functions/validations/userValidation";
import { validateProfileUpdate } from "../functions/validations/profileValidation";
import { ToolRepository, CategoryRepository, ProviderRepository, MaintenanceNotesRepository, MaterialRepository, UserRepository } from "../repositories";
import { ValidationUserProfileService ,ValidationUserService ,ValidationMaterialService, MaintenanceNotesService, MaterialService, CategoryService, ProviderService, ImageService, ToolService, ValidationMaintenanceNotesService, ValidationToolsService, UserService } from "../Services";
import { SignUpController, ToolController, MaterialController, UserController } from "../controllers";
import sequelze from "../config/databaseConnection";
import { Category, Provider, Tool, MaintenanceNotes, Material } from "../models";
import { validateMaterialsForm } from "../functions/validations/materialsValidtion";
import User from "../models/user.model";
import { admin } from "../config/firebaseConfig";

export const createToolController = () => {

    const maintenanceNotesRepository = new MaintenanceNotesRepository(MaintenanceNotes);
    const maintenanceNotesService = new MaintenanceNotesService(maintenanceNotesRepository);
    const validationToolsService = new ValidationToolsService(z);
    const validationMaintenanceNotesService = new ValidationMaintenanceNotesService(z);
    const imageService = new ImageService(writeFile, path, admin);
    const categoryRepository = new CategoryRepository(Category);
    const providerRepository = new ProviderRepository(Provider);
    const categoryService = new CategoryService(categoryRepository);
    const providerService = new ProviderService(providerRepository);
    const toolRepository = new ToolRepository(Tool, sequelze);
    const toolService = new ToolService(toolRepository);
    return new ToolController(imageService, validationToolsService, categoryService, providerService, toolService, validationMaintenanceNotesService, maintenanceNotesService);
}

export const createMaterialController = () => {
    const categoryRepository = new CategoryRepository(Category);
    const providerRepository = new ProviderRepository(Provider);
    const providerService = new ProviderService(providerRepository);
    const categoryService = new CategoryService(categoryRepository);
    const materialRepository = new MaterialRepository(Material, sequelze);
    const materialService = new MaterialService(materialRepository);
    const validationMaterialService = new ValidationMaterialService(validateMaterialsForm);
    return new MaterialController(materialService, validationMaterialService, categoryService, providerService);
}

export const createUserController = () => {
    const validationUserProfileService = new ValidationUserProfileService(validateProfileUpdate);
    const imageService = new ImageService(writeFile, path, admin);
    const userRepository = new UserRepository(User, sequelze);
    const userService = new UserService(userRepository);
    return new UserController(userService, imageService, validationUserProfileService);
}

export const createSignUpController = () => {
    const userRepository = new UserRepository(User, sequelze);
    const userService = new UserService(userRepository);
    const validationUserService = new ValidationUserService(validateUser);
    return new SignUpController(userService, validationUserService);
}



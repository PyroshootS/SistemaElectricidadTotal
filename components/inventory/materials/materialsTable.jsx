"use client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleDelete } from "../../../functions/handles/formHandles";
import { getSortIcon, getSortResults, requestSort } from "../../../functions/utils/sortingUtils";
import { searchFilter } from "../../../functions/utils/searchingUtils";
import { getCurrentPageItems } from "../../../functions/utils/nextUIPagUtils";
import { handleSearch } from "../../../functions/handles/searchHandles";
import { SuccessModal } from "../../modals/formSuccessModal/successModal";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/modal";
import { SearchInput } from "../../search/searchInput";
import SubmitModal from "../../modals/submitModal";


export default function MaterialsTable({ materials }) {
    const searchParams = useSearchParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const updateSuccess = searchParams.get("updateSuccess");
    const createSuccess = searchParams.get("createSuccess");
    const deleteSuccess = searchParams.get("deleteSuccess");
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const columns = [
        { title: "Nombre", key: "material" },
        { title: "Status", key: "status" },
        { title: "Categoría", key: "category" },
        { title: "Proveedor", key: "provider" },
        { title: "Fecha de expiración", key: "expiration" },
        { title: "Stock", key: "stock" },
        { title: "Precio", key: "cost" },
        { title: "Acciones", key: "actions" },
    ];

    const handleOnModalClose = () => {
        const newSearchParams = new URLSearchParams(window.location.search);
        if (updateSuccess) newSearchParams.delete("updateSuccess");
        if (createSuccess) newSearchParams.delete("createSuccess");
        if (deleteSuccess) newSearchParams.delete("deleteSuccess");

        if (newSearchParams.toString() !== "") {
            router.replace(`${window.location.pathname}?${newSearchParams.toString()}`);
        } else {
            router.replace(window.location.pathname);
        }
    }
    useEffect(() => {
        setPage(1);
    }, [search]);

    const results = searchFilter(materials, search);
    const sortedResults = getSortResults(results, sortConfig);
    const totalItems = sortedResults.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPageItems = getCurrentPageItems(page, itemsPerPage, sortedResults);

    return (
        <div className='flex-grow mx-auto max-w-7xl pt-16 px-6'>
            <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">Gestión de Materiales</h1>
            <div className="flex flex-col md:flex-row mb-2 justify-end items-center">
                <SearchInput handleSearch={(e) => handleSearch(e, setSearch)} className="flex flex-col text-xl justify-center rounded-xl mr-2r" />
                <Link className=" flex items-center mt-2 sm:mt-0 justify-center w-full sm:w-auto bg-green-700 hover:bg-green-800 transition duration-300 ease-in-out text-white font-bold py-3 ml-1 px-8 rounded-xl " href={"/gestion-inventario/materiales/gestionar"}>
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </div>
            <SuccessModal
                title={updateSuccess ? "Material actualizado" : createSuccess ? "Material creado" : deleteSuccess ? "Material eliminado" : "Equipo creado"}
                message={
                    updateSuccess ? "Material actualizado exitosamente" :
                        createSuccess ? "Material creado exitosamente" :
                            deleteSuccess ? "Material eliminado exitosamente" :
                                "Material guardado exitosamente"
                }
                onModalClose={handleOnModalClose}
                router={router}
                updateSearchParam={updateSuccess}
                createSearchParam={createSuccess}
                deleteSearchParam={deleteSuccess}
            />

            <Table className="dark" aria-label="Tabla de equipos"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            variant="flat"
                            isCompact
                            page={page}
                            total={totalPages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.key}>
                            <div className="flex items-center">
                                {column.title}
                                {column.key !== 'actions' && (
                                    <FontAwesomeIcon
                                        className="ml-2 cursor-pointer"
                                        icon={getSortIcon(column.key, sortConfig)}
                                        onClick={() => requestSort(column.key, sortConfig, setSortConfig)}
                                    />
                                )}
                            </div>
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent="No hay resultados">
                    {currentPageItems.map((material) => (
                        <TableRow key={material.id}>
                            <TableCell>{material.material}</TableCell>
                            <TableCell>{material.status ? "Activo" : "Inactivo"}</TableCell>
                            <TableCell>{material.category}</TableCell>
                            <TableCell>{material.provider}</TableCell>
                            <TableCell>{material.expiration ? material.expiration : "No expira"}</TableCell>
                            <TableCell>{material.stock}</TableCell>
                            <TableCell>{material.cost}</TableCell>
                            <TableCell>
                                <div className="flex w-full gap-2">
                                    <Link href={`/gestion-inventario/materiales/gestionar?id=${material.id}`} passHref>
                                        <Button
                                            size="sm"
                                            className="bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold rounded-lg flex items-center justify-center w-8 h-8"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="text-sm" />
                                        </Button>
                                    </Link>
                                    <SubmitModal
                                        onSubmit={() => handleDelete(material.id, process.env.NEXT_PUBLIC_URL_MATERIALS_DELETE, process.env.NEXT_PUBLIC_URL_MATERIALS)}
                                        title={"Eliminar material"}
                                        message={"¿Estas seguro de eliminar este material?"}
                                        actionValue={"Eliminar"}
                                        classNameSubmitButton="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold rounded-lg flex items-center justify-center"
                                        classNameModalButton="bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out text-white font-bold rounded-lg flex items-center justify-center w-8 h-8"
                                        isWithIcon
                                        icon={faTrash}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
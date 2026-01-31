import { useQuery } from "@tanstack/react-query";
import { companyService } from "../../../services";

export const useUserCompany = () => {
    return useQuery({
        queryKey: ['user-company'],
        queryFn: () => {
            return companyService.findMyCompany().then(res => res.data);
        },
    });
};
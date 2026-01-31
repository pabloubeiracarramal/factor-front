import { useMutation, useQueryClient } from '@tanstack/react-query';
import { companyService } from '../../../services';
import type { UpdateCompanyDto } from '../../../types';

interface UpdateCompanyParams {
  id: string;
  data: UpdateCompanyDto;
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCompanyParams) => 
      companyService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-company'] });
    },
  });
}

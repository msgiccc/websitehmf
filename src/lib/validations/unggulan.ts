import { z } from "zod";

export const ProgramUnggulanSchema = z.object({
    id: z.string().optional(),
    kabinetId: z.string().uuid(),
    nama: z.string().min(2, "Nama program terlalu pendek"),
    deskripsi: z.string().min(10, "Deskripsi harus detail dan informatif"),
    iconSvg: z.string().optional(),
});

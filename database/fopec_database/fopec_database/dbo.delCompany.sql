use fopec
go

 
if exists(select * from sys.procedures where name = 'delCompany')
begin 
	drop proc delCompany;
end 
go

create proc delCompany 
	@id int,
	@person_id int
as
begin
	set nocount on;

	if exists(
		select company_id 
		from company_location 
		where company_id = @id 
			union
		select company_id 
		from crowdsourced_research 
		where company_id = @id 
			or parent_company_id = @id
		)
		begin 
			return -1;
		end 

	if not exists (select 1 from company where person_id_created = @person_id)
	begin 
		return -1
	end


	delete company where id = @id ;
	return 0;
end 
go 

-- exec delCompany;
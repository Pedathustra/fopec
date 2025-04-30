if exists( select name from sys.procedures where name = 'delPerson')
begin
	drop proc delPerson
end
go

create proc delPerson
		@person_id int
as 
	delete 
	from person 
	where id = @person_id 
	;
	return 0;
go

--select * from person
--exec delPerson 152